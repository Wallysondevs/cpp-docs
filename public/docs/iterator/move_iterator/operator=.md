# std::move_iterator&lt;Iter&gt;::operator=

template< class U >   
move_iterator& operator=( const move_iterator&lt;U&gt;& other ); |  | (constexpr desde C++17)  

  
Atribui other.`_[current](<#/doc/iterator/move_iterator>)_` a `_[current](<#/doc/iterator/move_iterator>)_` .

Se `U` não for conversível para `Iter`, o programa é malformado. | (até C++20)  
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_same_v](<#/doc/types/is_same>)<U, Iter> for false e ambos [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const U&, Iter&gt; e [std::assignable_from](<#/doc/concepts/assignable_from>)<Iter&, const U&> forem modelados. | (desde C++20)  
  
### Parâmetros

other  |  \-  |  adaptador de iterador a ser atribuído   
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3435](<https://cplusplus.github.io/LWG/issue3435>) | C++20  | o operador de atribuição de conversão não era restrito  | restrito   
  
### Veja também

[ (constructor)](<#/doc/iterator/move_iterator/move_iterator>)(C++11) |  constrói um novo adaptador de iterador   
(função membro pública)  