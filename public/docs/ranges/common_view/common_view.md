# std::ranges::common_view&lt;V&gt;::common_view

```cpp
common_view() = default;  // (1) (desde C++20)
constexpr explicit common_view( V r );  // (2) (desde C++20)
```

  
Constrói um `common_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente. Após a construção, [`base()`](<#/doc/ranges/common_view/base>) retorna uma cópia de V().

2) Inicializa a view subjacente com std::move(r).

### Parâmetros

- **r** — view subjacente a ser adaptada em um common-range
  
### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3405](<https://cplusplus.github.io/LWG/issue3405>) | C++20 | o construtor de conversão redundante pode causar recursão de restrição | removido