let db = require('./database')

let queries = {
    showQuestions: function(req,res){
        let subject = req.body.subject;

        let sql;

        if(subject === 'English'){
            sql = "SELECT * FROM english_ques";

            db.query(sql,(err,result) => {
                if(err) throw err;
                if(result.length > 0){
                    console.log("data found !!");
                    let qry = "SELECT * FROM english_options";
                    db.query(qry, (error, response) => {
                        if(error) throw error;
                        if(response.length > 0){
                            console.log("options found !!",response);
                            res.status(200).json({
                                question: result,
                                options: response,
                                status: true,
                                message: "Questions and options found !!!"
                            });
                        }
                        else{
                            console.log("unable to fetch options !!!");
                        }
                    })
                }
                else{
                    console.log("Something went wrong !!!");
                    return res.status(400).json({
                        data: err,
                        status: false,
                        message: 'Unable to fetch data !!!""'
                    })
                }
            })
        }
        else if(subject === 'GK'){
            sql = "SELECT * FROM gk_ques";

            db.query(sql,(err,result) => {
                if(err) throw err;
                if(result.length > 0){
                    console.log("data found !!");
                    let qry = "SELECT * FROM gk_options";
                    db.query(qry, (error, response) => {
                        if(error) throw error;
                        if(response.length > 0){
                            console.log("options found !!",response);
                            res.status(200).json({
                                question: result,
                                options: response,
                                status: true,
                                message: "Questions and options found !!!"
                            });
                        }
                        else{
                            console.log("unable to fetch options !!!");
                        }
                    })
                }
                else{
                    console.log("Something went wrong !!!");
                    return res.status(400).json({
                        data: err,
                        status: false,
                        message: 'Unable to fetch data !!!""'
                    })
                }
            })
        }

        else if(subject === 'Reasoning'){
            sql = "SELECT * FROM resoning_ques";

            db.query(sql,(err,result) => {
                if(err) throw err;
                if(result.length > 0){
                    console.log("data found !!");
                    let qry = "SELECT * FROM reasoning_options";
                    db.query(qry, (error, response) => {
                        if(error) throw error;
                        if(response.length > 0){
                            console.log("options found !!",response);
                            res.status(200).json({
                                question: result,
                                options: response,
                                status: true,
                                message: "Questions and options found !!!"
                            });
                        }
                        else{
                            console.log("unable to fetch options !!!");
                        }
                    })
                }
                else{
                    console.log("Something went wrong !!!");
                    return res.status(400).json({
                        data: err,
                        status: false,
                        message: 'Unable to fetch data !!!""'
                    })
                }
            })
        }

    }
}

module.exports = queries;