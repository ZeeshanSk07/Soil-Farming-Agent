const app = express();

app.use(express.json());

app.listen(port, function(){
    console.log('Server is running on port'+ port);
});