# std::nullopt_t

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
struct nullopt_t;
```

`std::nullopt_t` é um tipo de classe vazia usado para indicar que um [std::optional](<#/doc/utility/optional>) não contém um valor.

`std::nullopt_t` é um [LiteralType](<#/doc/named_req/LiteralType>) não-agregado que não possui construtor padrão, nem construtor de lista de inicialização, mas possui um construtor `constexpr` que aceita um tipo literal definido pela implementação.

### Notas

As restrições nos construtores de `nullopt_t` existem para suportar tanto `op = {};` quanto `op = nullopt;` como a sintaxe para desengajar um objeto optional.

Uma possível implementação desta classe é
```cpp
    struct nullopt_t {
        constexpr explicit nullopt_t(int) {}
    };
```

### Veja também

[ nullopt](<#/doc/utility/optional/nullopt>)(C++17) | um objeto do tipo `nullopt_t`
(constante)