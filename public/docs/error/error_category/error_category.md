# std::error_category::error_category

```cpp
constexpr error_category() noexcept;  // (1) (desde C++11)
error_category( const error_category& ) = delete;  // (2) (desde C++11)
```

1) Constrói o objeto da categoria de erro.

2) O construtor de cópia é deletado. `error_category` não é nem [MoveConstructible](<#/doc/named_req/MoveConstructible>) nem [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

(nenhum)

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2145](<https://cplusplus.github.io/LWG/issue2145>) | C++11 | `error_category` não era construtível | construtor padrão adicionado