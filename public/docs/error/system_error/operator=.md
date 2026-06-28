# std::system_error::operator=

```cpp
system_error& operator=( const system_error& other ) noexcept;  // (desde C++11)
```

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::system_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. 

### Parâmetros

other  |  \-  |  outro objeto `system_error` para atribuir   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstring>
    #include <iostream>
    #include <system_error>
     
    void print(const std::system_error& e)
    {
        std::cout << "code:    [" << e.code() << "]\n"
                     "message: [" << e.code().message() << "]\n"
                     "what:    [" << e.what() << "]\n\n";
    }
     
    int main()
    {
        std::system_error e1(EDOM, std::generic_category(), "Error info #1");
        print(e1);
     
        std::system_error e2(EIO, std::system_category(), "Error info #2");
        print(e2);
     
        e1 = e2;
        assert(std::strcmp(e1.what(), e2.what()) == 0);
        print(e1);
    }
```

Saída possível: 
```
    code:    [generic:33]
    message: [Numerical argument out of domain]
    what:    [Error info #1: Numerical argument out of domain]
     
    code:    [system:5]
    message: [Input/output error]
    what:    [Error info #2: Input/output error]
     
    code:    [system:5]
    message: [Input/output error]
    what:    [Error info #2: Input/output error]
```