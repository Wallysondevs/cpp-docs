# std::owner_less

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
struct owner_less; /* undefined */
(até C++17)
template< class T = void >
struct owner_less; /* undefined */
template< class T >
struct owner_less<std::shared_ptr<T>>;
template< class T >
struct owner_less<std::weak_ptr<T>>;
template<>
struct owner_less<void>;
```

  
Este objeto de função fornece ordenação de tipo misto baseada em proprietário (em oposição à baseada em valor) tanto para [std::weak_ptr](<#/doc/memory/weak_ptr>) quanto para [std::shared_ptr](<#/doc/memory/shared_ptr>). A ordem é tal que dois smart pointers se comparam como equivalentes apenas se ambos estiverem vazios ou se compartilharem a propriedade, mesmo que os valores dos ponteiros brutos obtidos por `get()` sejam diferentes (por exemplo, porque apontam para subobjetos diferentes dentro do mesmo objeto). 

1) A ordenação de tipo misto baseada em proprietário não é fornecida para tipos diferentes de [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>).

2) A ordenação de tipo misto baseada em proprietário de [std::shared_ptr](<#/doc/memory/shared_ptr>).

É o predicado de comparação preferido ao construir containers associativos com [std::shared_ptr](<#/doc/memory/shared_ptr>) como chaves, ou seja, [std::map](<#/doc/container/map>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;, U, std::owner_less<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;>>.

3) A ordenação de tipo misto baseada em proprietário de [std::weak_ptr](<#/doc/memory/weak_ptr>).

É o predicado de comparação preferido ao construir containers associativos com [std::weak_ptr](<#/doc/memory/weak_ptr>) como chaves, ou seja, [std::map](<#/doc/container/map>)<[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;, U, std::owner_less<[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;>>.

4) A especialização `void` deduz os tipos de parâmetro a partir dos argumentos.

O `operator<` padrão não é definido para weak pointers, e pode considerar erroneamente dois shared pointers para o mesmo objeto como não equivalentes (veja [`std::shared_ptr::owner_before`](<#/doc/memory/shared_ptr/owner_before>)). 

### Especializações

A standard library fornece uma especialização de `std::owner_less` quando `T` não é especificado. Neste caso, os tipos de parâmetro são deduzidos a partir dos argumentos (cada um dos quais ainda deve ser um [std::shared_ptr](<#/doc/memory/shared_ptr>) ou um [std::weak_ptr](<#/doc/memory/weak_ptr>)).  |  [ owner_less&lt;void&gt;](<#/doc/memory/owner_less_void>) |  objeto de função que fornece ordenação de tipo misto baseada em proprietário de shared e weak pointers, independentemente do tipo do objeto apontado   
(especialização de template de classe)  
(desde C++17)  
  
  

### Tipos aninhados

|  Tipo aninhado  |  Definição   
---|---
`result_type` (obsoleto em C++17) |  (2,3) bool  
`first_argument_type` (obsoleto em C++17) |  (2) [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;  
(3) [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;  
`second_argument_type` (obsoleto em C++17) |  (2) [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;  
(3) [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;  
(até C++20)  
  
### Funções membro

** operator()** |  compara seus argumentos usando semântica baseada em proprietário   
(função)  
  
## std::owner_less::operator()

```cpp
membro apenas da especialização (2)
bool operator()( const std::shared_ptr<T>& lhs,
const std::shared_ptr<T>& rhs ) const noexcept;  // (desde C++11)
membro apenas da especialização (3)
bool operator()( const std::weak_ptr<T>& lhs,
const std::weak_ptr<T>& rhs ) const noexcept;  // (desde C++11)
membro de ambas as especializações de template
bool operator()( const std::shared_ptr<T>& lhs,
const std::weak_ptr<T>& rhs ) const noexcept;  // (desde C++11)
bool operator()( const std::weak_ptr<T>& lhs,
const std::shared_ptr<T>& rhs ) const noexcept;  // (desde C++11)
```

  
Compara lhs e rhs usando semântica baseada em proprietário. Efetivamente chama lhs.owner_before(rhs). 

A ordenação é uma relação de ordenação fraca estrita. 

lhs e rhs são equivalentes apenas se ambos estiverem vazios ou compartilharem a propriedade. 

### Parâmetros

lhs, rhs  |  \-  |  ponteiros de propriedade compartilhada para comparar   
  
### Valor de retorno

true se lhs for _menor que_ rhs conforme determinado pela ordenação baseada em proprietário, false caso contrário. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2873](<https://cplusplus.github.io/LWG/issue2873>) | C++11  | operator() não era exigido ser noexcept  | exigido ser noexcept   
  
### Veja também

[ owner_before](<#/doc/memory/shared_ptr/owner_before>) |  fornece ordenação baseada em proprietário de shared pointers   
(função membro pública de `std::shared_ptr<T>`)  
[ owner_before](<#/doc/memory/weak_ptr/owner_before>) |  fornece ordenação baseada em proprietário de weak pointers   
(função membro pública de `std::weak_ptr<T>`)