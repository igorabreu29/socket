import { httpServer } from "./app";
import './socket'

httpServer.listen(3333, () => console.log('Server is running on PORT 3333'))