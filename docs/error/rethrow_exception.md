# std::rethrow_exception

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
[[noreturn]] void rethrow_exception( std::exception_ptr p );
(constexpr desde C++26)
```

Lança o objeto de exceção previamente capturado e referenciado pelo ponteiro de exceção p, ou uma cópia desse objeto.

Não é especificado se uma cópia é feita. Se uma cópia for feita, o armazenamento para ela é alocado de uma maneira não especificada.

O comportamento é indefinido se p for nulo.

### Parâmetros

- **p** — [std::exception_ptr](<#/doc/error/exception_ptr>) não nulo

### Exceções

O objeto de exceção referenciado por p se nenhuma cópia for feita.

Caso contrário, uma cópia de tal objeto de exceção se a implementação copiou o objeto de exceção com sucesso.

Caso contrário, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou a exceção lançada ao copiar o objeto de exceção, se a alocação ou a cópia falharem, respectivamente.

### Notas

Antes de [P1675R2](<https://wg21.link/P1675R2>), `rethrow_exception` não tinha permissão para copiar o objeto de exceção, o que é inviável em algumas plataformas onde os objetos de exceção são alocados na pilha.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Execute este código
```
    #include <exception>
    #include <iostream>
    #include <stdexcept>
    #include <string>
    
    void handle_eptr(std::exception_ptr eptr) // passing by value is OK
    {
        try
        {
            if (eptr)
                std::rethrow_exception(eptr);
        }
        catch(const std::exception& e)
        {
            std::cout << "Caught exception: '" << e.what() << "'\n";
        }
    }
    
    int main()
    {
        std::exception_ptr eptr;
    
        try
        {
            [[maybe_unused]]
            char ch = std::string().at(1); // this generates a std::out_of_range
        }
        catch(...)
        {
            eptr = std::current_exception(); // capture
        }
    
        handle_eptr(eptr);
    
    } // destructor for std::out_of_range called here, when the eptr is destructed
```

Saída possível:
```
    Caught exception: 'basic_string::at: __n (which is 1) >= this->size() (which is 0)'
```

### Veja também

[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para lidar com objetos de exceção
(typedef)
[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)