# std::variant_npos

Definido no header `[<variant>](<#/doc/header/variant>)`

```cpp
inline constexpr std::size_t variant_npos = -1;  // (desde C++17)
```

Este é um valor especial igual ao maior valor representável pelo tipo [std::size_t](<#/doc/types/size_t>), usado como o valor de retorno de [`index()`](<#/doc/utility/variant/index>) quando [`valueless_by_exception()`](<#/doc/utility/variant/valueless_by_exception>) é true.

Execute este código
```
    #include <iostream>
    #include <stdexcept>
    #include <string>
    #include <variant>
     
    struct Demon
    {
        Demon(int) {}
        Demon(const Demon&) { throw std::domain_error("copy ctor"); }
        Demon& operator= (const Demon&) = default;
    };
     
    int main()
    {
        std::variant<int, Demon> var{42};
        std::cout
            << std::boolalpha
            << "index == npos: " << (var.index() == std::variant_npos) << '\n';
     
        try { var = Demon{666}; } catch (const std::domain_error& ex)
        {
            std::cout
                << "Exception: " << ex.what() << '\n'
                << "index == npos: " << (var.index() == std::variant_npos) << '\n'
                << "valueless: " << var.valueless_by_exception() << '\n';
        }
    }
```

Saída possível:
```
    index == npos: false
    Exception: copy ctor
    index == npos: true
    valueless: true
```

### Veja também

[ index](<#/doc/utility/variant/index>) | retorna o índice baseado em zero da alternativa contida no `variant`
(função membro pública)
[ valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>) | verifica se o `variant` está em estado inválido
(função membro pública)