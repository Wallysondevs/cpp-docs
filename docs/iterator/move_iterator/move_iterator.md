# std::move_iterator&lt;Iter&gt;::move_iterator

move_iterator(); |  (1) | (constexpr desde C++17)  
---|---|---
explicit move_iterator( iterator_type x ); |  (2) | (constexpr desde C++17)  
template< class U >  
move_iterator( const move_iterator&lt;U&gt;& other ); |  (3) | (constexpr desde C++17)  

  
Constrói um novo `move_iterator`. 

Sobrecarga  | `_[current](<#/doc/iterator/move_iterator>)_`  
---|---
(1) | [value-initialized](<#/doc/language/value_initialization>)  
(2) |  inicializado com x(até C++20)std::move(x)(desde C++20)  
(3) | inicializado com other.`_[current](<#/doc/iterator/move_iterator>)_`  
  
3) O construtor de conversão. Se `U` não for conversível para `Iter`, o programa é malformado.  | (até C++20)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_same_v](<#/doc/types/is_same>)<U, Iter> for falso e [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const U&, Iter&gt; for modelado.  | (desde C++20)  
  
### Parâmetros

x  |  \-  |  iterator para adaptar   
---|---|---
other  |  \-  |  adaptador de iterator para copiar   
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3435](<https://cplusplus.github.io/LWG/issue3435>) | C++20  | sobrecarga ([3](<#/doc/iterator/move_iterator/move_iterator>)) não era restrita  | restrita   
  
### Veja também

[ operator=](<#/>)(C++11) |  atribui outro adaptador de iterator   
(função membro pública)  
[ make_move_iterator](<#/doc/iterator/make_move_iterator>)(C++11) |  cria um [std::move_iterator](<#/doc/iterator/move_iterator>) de tipo inferido a partir do argumento   
(modelo de função)