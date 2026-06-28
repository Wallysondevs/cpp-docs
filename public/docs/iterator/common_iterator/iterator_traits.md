# std::iterator_traits&lt;std::common_iterator&gt;

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::input_iterator I, class S >
struct iterator_traits<std::common_iterator<I, S>>;
```

  
Fornece a interface uniforme para as propriedades do tipo [std::common_iterator](<#/doc/iterator/common_iterator>). 

### Tipos Membro

Nome do Tipo  |  Definição   
---|---
`iterator_concept` | 

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `I` modela [std::forward_iterator](<#/doc/iterator/forward_iterator>). 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`iterator_category`  
(presente condicionalmente) | 

  * Não definido, se [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt; não for um tipo integral. 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt;::iterator_category for válido e denotar um tipo que modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)>. 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`value_type` |  [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;  
---|---
`difference_type` |  [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;  
`pointer` | 

  * decltype(c.operator->()), se for bem-formado (onde c é um lvalue do tipo const [std::common_iterator](<#/doc/iterator/common_iterator>)<I, S>). 
  * void caso contrário. 

  
`reference` |  [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;  
  
### Exemplo

Execute este código
```cpp
    #include <iterator>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3, 4};
        using CV = std::common_iterator<
                        std::counted_iterator<std::vector<int>::iterator>,
                        std::default_sentinel_t>;
        CV i{std::counted_iterator{v.begin(), 3}};
        using TRCV = std::iterator_traits<decltype(i)>;
        static_assert(std::is_same<TRCV::iterator_concept, std::forward_iterator_tag>());
        static_assert(std::is_same<TRCV::iterator_category, std::forward_iterator_tag>());
        static_assert(std::is_same<TRCV::value_type, int>());
        static_assert(std::is_same<TRCV::difference_type,
                      std::vector<int>::difference_type>());
        static_assert(std::is_same<TRCV::pointer, decltype(i.operator->())>());
        static_assert(std::is_same<TRCV::reference, int&>());
    
        CV s{std::default_sentinel};
        using TRCS = std::iterator_traits<decltype(s)>;
        static_assert(std::is_same<TRCS::iterator_concept, std::forward_iterator_tag>());
        static_assert(std::is_same<TRCS::iterator_category, std::forward_iterator_tag>());
        static_assert(std::is_same<TRCS::value_type, int>());
        static_assert(std::is_same<TRCS::difference_type,
                      std::vector<int>::difference_type>());
        static_assert(std::is_same<TRCS::pointer, decltype(s.operator->())>());
        static_assert(std::is_same<TRCS::reference, int&>());
    }
```

### Relatórios de Defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3749](<https://cplusplus.github.io/LWG/issue3749>) | C++20  | se [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt; não for um tipo inteiro,  
`iterator_category` era [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) | `iterator_category` é  
indefinido neste caso   
  
### Veja também

[ iterator_traits](<#/doc/iterator/iterator_traits>) |  fornece interface uniforme para as propriedades de um iterator   
(modelo de classe)  
[ std::incrementable_traits<std::common_iterator>](<#/doc/iterator/common_iterator/incrementable_traits>)(C++20) |  calcula o tipo de diferença associado do tipo [std::common_iterator](<#/doc/iterator/common_iterator>)   
(especialização de modelo de classe)