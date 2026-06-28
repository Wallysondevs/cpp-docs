# std::experimental::nullopt_t

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
struct nullopt_t;
```

`std::experimental::nullopt_t` é um tipo de classe vazia usado para indicar um tipo `optional` com estado não inicializado. Em particular, [std::experimental::optional](<#/doc/experimental/optional>) possui um construtor com `nullopt_t` como um único argumento, que cria um optional que não contém um valor.

`std::experimental::nullopt_t` deve ser um [LiteralType](<#/doc/named_req/LiteralType>) e não pode ter um construtor padrão.

Deve ter um construtor `constexpr` que recebe algum tipo literal definido pela implementação.

### Notas

`nullopt_t` não é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) para suportar tanto `op = {};` quanto `op = nullopt;` como a sintaxe para desengajar um objeto optional.

Uma possível implementação desta classe é
```cpp
    struct nullopt_t
    {
        constexpr nullopt_t(int) {}
    };
```

### Veja também

[ nullopt](<#/doc/utility/optional/nullopt>)(C++17) | um objeto do tipo `nullopt_t`
(constante)