# std::monostate

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
Definido no cabeçalho `<utility>`
struct monostate { };
```

Tipo de unidade destinado ao uso como uma alternativa vazia bem-comportada em [std::variant](<#/doc/utility/variant>). Em particular, uma variant de tipos não-construíveis por padrão pode listar `std::monostate` como sua primeira alternativa: isso torna a própria variant construível por padrão.

### Funções membro

(construtor)(declarado implicitamente) | construtor padrão/cópia/movimento implícito trivial
(função membro pública)
(destrutor)(declarado implicitamente) | destrutor implícito trivial
(função membro pública)
operator=(declarado implicitamente) | atribuição de cópia/movimento implícita trivial
(função membro pública)

### Funções não-membro

## std::operator==, !=, <, <=, >, >=, <=>(std::monostate)

```cpp
constexpr bool operator==( monostate, monostate ) noexcept { return true; }  // (1) (desde C++17)
  // (2)
constexpr bool operator!=( monostate, monostate ) noexcept { return false; }
constexpr bool operator< ( monostate, monostate ) noexcept { return false; }
constexpr bool operator> ( monostate, monostate ) noexcept { return false; }
constexpr bool operator<=( monostate, monostate ) noexcept { return true; }
constexpr bool operator>=( monostate, monostate ) noexcept { return true; }  // (desde C++17)
(até C++20)
constexpr std::strong_ordering operator<=>( monostate, monostate ) noexcept
{
return std::strong_ordering::equal;
}  // (desde C++20)
```

Todas as instâncias de `std::monostate` comparam como iguais.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```

### Classes auxiliares

## std::hash<std::monostate>

```cpp
template <>
struct std::hash<monostate>;  // (desde C++17)
```

Especializa o algoritmo [std::hash](<#/doc/utility/hash>) para `std::monostate`.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <variant>
    
    struct S
    {
        S(int i) : i(i) {}
        int i;
    };
    
    int main()
    {
        // Without the monostate type this declaration will fail.
        // This is because S is not default-constructible.
        std::variant<std::monostate, S> var;
        assert(var.index() == 0);
    
        try
        {
            std::get<S>(var); // throws! We need to assign a value
        }
        catch(const std::bad_variant_access& e)
        {
            std::cout << e.what() << '\n';
        }
    
        var = 42;
        std::cout << "std::get: " << std::get<S>(var).i << '\n'
                  << "std::hash: " << std::hex << std::showbase
                  << std::hash<std::monostate>{}(std::monostate{}) << '\n';
    }
```

Saída possível:
```
    std::get: wrong index for variant
    std::get: 42
    std::hash: 0xffffffffffffe19f
```

### Veja também

[ (constructor)](<#/doc/utility/variant/variant>) | constrói o objeto `variant`
(função membro pública)