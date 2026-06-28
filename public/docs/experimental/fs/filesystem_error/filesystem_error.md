# std::experimental::filesystem::filesystem_error::filesystem_error

filesystem_error( const string& what_arg, error_code ec ); |  (1)  |  (filesystem TS)  
---|---|---
filesystem_error( const string& what_arg, const path& p1, error_code ec ); |  (2)  |  (filesystem TS)  
filesystem_error( const string& what_arg, const path& p1, const path& p2, error_code ec ); |  (3)  |  (filesystem TS)  

  
Constrói um novo objeto de erro de filesystem. A string explicativa é definida como what_arg, o código de erro é definido como ec e, opcionalmente, os paths que estiveram envolvidos na operação que resultou no erro são definidos como p1 e p2. 

### Parâmetros

| Esta seção está incompleta   
  
### Ver também

| Esta seção está incompleta   