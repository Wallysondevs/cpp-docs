# std::make_error_condition(std::errc)

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
std::error_condition make_error_condition( std::errc e ) noexcept;  // (desde C++11)
```

  
Cria uma condição de erro para um valor `errc` e. Define o valor de erro como int(e) e a categoria de erro como [std::generic_category](<#/doc/error/generic_category>). 

### Parâmetros

e  |  \-  |  valor de erro padrão   
  
### Valor de retorno

Condição de erro para e. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <system_error>
     
    int main()
    {
        auto err = std::make_error_condition(std::errc::invalid_argument);
        std::cout << err.message() << '\n';
    }
```

Saída possível: 
```
    Invalid argument
```