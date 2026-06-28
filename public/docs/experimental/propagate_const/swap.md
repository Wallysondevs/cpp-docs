# std::experimental::propagate_const&lt;T&gt;::swap

constexpr void swap( propagate_const & pt ) noexcept(/* see below */); |  |  (library fundamentals TS v2)  

  
Troca o ponteiro encapsulado com o de pt. Seja `t_` o membro de dados privado que é o objeto tipo ponteiro encapsulado, então esta função é equivalente a `swap(t_, pt.t_)`, onde a resolução de sobrecarga para `swap` é realizada entre [std::swap](<#/doc/utility/swap>) e qualquer declaração encontrada pelas regras de pesquisa usuais, conforme descrito em [Swappable](<#/doc/named_req/Swappable>). 

O comportamento é indefinido se lvalues de `T` não satisfazem [Swappable](<#/doc/named_req/Swappable>). 

### Parâmetros

pt  |  \-  |  outro objeto `propagate_const` para trocar   
  
### Exceções

[`noexcept`](<#/doc/language/noexcept_spec>) specification: noexcept(noexcept(swap(t_, pt.t_)))A pesquisa pelo identificador `swap` na especificação de exceção encontra as sobrecargas descritas acima, e não encontra a própria função membro, tornando a especificação de exceção equivalente a C++17 [std::is_nothrow_swappable](<#/doc/types/is_swappable>).  | (library fundamentals TS v2)  
---|---
[`noexcept`](<#/doc/language/noexcept_spec>) specification: noexcept([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt;) | (library fundamentals TS v3)  
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3413](<https://cplusplus.github.io/LWG/issue3413>) | LFTSv2  | a especificação de exceção estava malformada  | tornada bem-formada 