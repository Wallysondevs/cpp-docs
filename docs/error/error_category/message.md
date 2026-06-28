# std::error_category::message

```cpp
virtual std::string message( int condition ) const = 0;  // (desde C++11)
```

  
Retorna uma string descrevendo a condição de erro fornecida para a categoria de erro representada por *this. 

### Parâmetros

condition  |  \-  |  especifica a condição de erro a ser descrita   
  
### Valor de retorno

Uma string descrevendo a condição de erro fornecida. 

### Exceções

Pode lançar exceções definidas pela implementação. 