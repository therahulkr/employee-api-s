const { hash } = require('bcryptjs');
const Employee = require('../Model/employee_model');

//Register a User
exports.registerEmployee = async(req,res,next)=>{
    // const {name ,email ,password,age,department} = req.body;
    const {email,password,age,department,name} = req.body;
    const findemp = await Employee.findOne({email});
    if(!email||!password||!age||!name||!department){
        return res.status(400).json({
            success : false,
            message : "Some credential is missing"
         });
    }
    
    if(findemp) 
        return res.status(400).json({
            success : false,
            message : "Employee with this email already exist"
        });

    const newemployee = await Employee.create(req.body);

    
    return res.status(200).json({
       success : true,
       message : 'Sucessfully created the employee',
       newemployee
    });

};

    //log in user 
    
exports.employeeLogin = async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user has given pass and email

    if(!email||!password){
        return res.status(400).json({
            success : false,
            message : "Please Enter Email and Password"
         });
    }

    const employee = await Employee.findOne({email}).select("+password");
    if(!employee){
        return res.status(401).json({
            success : false,
            message : 'Invalid email or password'
         });
    }
        
    const isPassMatched = await employee.comparePassword(password);
        
    if(!isPassMatched){
        return res.status(401).json({
            success : false,
            message : 'Incorrect Password'
         });
    }

    return res.status(200).json({
        success : true,
        message : 'LogedIn successfully',
        employee
     });
};

exports.getAllEmployees = async(req,res,next)=>{
    
    const employees = await Employee.find();

    res.status(200).json({
        success : true,
        message : "list of all the employees",
        employees
    }
    )
};

// delete an employee

exports.deleteEmployee = async(req,res,next)=>{

    const employee = await Employee.findById(req.params.id);
    if(!employee){
        return res.status(401).json({
            success : false,
            message : `Employee does not exist with id : ${req.params.id}`
         });
    }
    await employee.remove();
    res.status(200).json({
        success:true,
        message : "Employee deleted successfully"
    })
}

// update employee details

exports.updateEmployee = async(req,res,next)=>{
    try
    {
        if(req.body.password){req.body.password = await hash(req.body.password,10)}
        const employee = await Employee.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true,
            useFindAndModify : false,
        })
        res.status(200).json({
            success:true,
            message : "Employee updated successfully",
            employee
        })}
    catch{
        return res.status(401).json({
            success : false,
            message : `Employee does not exist with id : ${req.params.id}`
         });
    }
}