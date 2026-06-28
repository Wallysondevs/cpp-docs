# std::any::has_value

```cpp
bool has_value() const noexcept;  // (desde C++17)
```

Verifica se o objeto contém um valor.

### Parâmetros

(nenhum)

### Valor de retorno

true se e somente se a instância contiver um valor.

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <cassert>
    #include <string>
    
    int main()
    {
        std::any a0;
        assert(a0.has_value() == false);
    
        std::any a1 = 42;
        assert(a1.has_value() == true);
        assert(std::any_cast<int>(a1) == 42);
        a1.reset();
        assert(a1.has_value() == false);
    
        auto a2 = std::make_any<std::string>("Andromeda");
        assert(a2.has_value() == true);
        assert(std::any_cast<std::string&>(a2) == "Andromeda");
        a2.reset();
        assert(a2.has_value() == false);
    }
```

### Veja também

[ reset](<#/doc/utility/any/reset>) | destrói o objeto contido
(função membro pública)