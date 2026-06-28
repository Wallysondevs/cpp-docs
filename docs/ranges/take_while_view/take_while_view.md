# std::ranges::take_while_view&lt;V,Pred&gt;::take_while_view

```cpp
take_while_view() requires std::default_initializable<V> &&
std::default_initializable<Pred> = default;  // (1) (desde C++20)
constexpr explicit take_while_view( V base, Pred pred );  // (2) (desde C++20)
```

  
Constrói um `take_while_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente e o predicado.

2) Constrói por movimento a view subjacente [`_base__`](<#/doc/ranges/take_while_view>) a partir de `base` e o predicado [`_pred__`](<#/doc/ranges/take_while_view>) a partir de `pred`.

### Parâmetros

base  |  \-  |  view subjacente   
---|---|---
fun  |  \-  |  predicado   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)  
([P2711R1](<https://wg21.link/P2711R1>))  | C++20  | o construtor multiparâmetro não era explicit  | tornado explicit   
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | se `Pred` não for [`default_initializable`](<#/doc/concepts/default_initializable>), o construtor padrão constrói um `take_while_view` que não contém um `Pred` | o `take_while_view` também não é [`default_initializable`](<#/doc/concepts/default_initializable>)