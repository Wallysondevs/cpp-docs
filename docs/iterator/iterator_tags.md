# std::input_iterator_tag, std::output_iterator_tag, std::forward_iterator_tag, std::bidirectional_iterator_tag, std::random_access_iterator_tag, std::contiguous_iterator_tag

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
struct input_iterator_tag {};
struct output_iterator_tag {};
struct forward_iterator_tag : public input_iterator_tag {};
struct bidirectional_iterator_tag : public forward_iterator_tag {};
struct random_access_iterator_tag : public bidirectional_iterator_tag {};
struct contiguous_iterator_tag : public random_access_iterator_tag {};
```

  
Define a categoria de um iterator. Cada tag é um tipo vazio. 

### Categoria de Iterator

Para cada tipo [LegacyIterator](<#/doc/named_req/Iterator>) `It`, um `typedef` [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::iterator_category deve ser definido como um alias para um desses tipos de tag, para indicar a categoria mais específica à qual `It` pertence. 

  1. `input_iterator_tag` corresponde a [LegacyInputIterator](<#/doc/named_req/InputIterator>). 
  2. `output_iterator_tag` corresponde a [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). 
  3. `forward_iterator_tag` corresponde a [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>). 
  4. `bidirectional_iterator_tag` corresponde a [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>). 
  5. `random_access_iterator_tag` corresponde a [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). 

Tags de categoria de iterator carregam informações que podem ser usadas para selecionar os algoritmos mais eficientes para o conjunto de requisitos específico que é implicado pela categoria. 

### Conceito de Iterator

Para cada tipo [`input_iterator`](<#/doc/iterator/input_iterator>) `It`, It::iterator_concept (se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt; for gerado a partir do template primário) ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::iterator_concept (se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt; for especializado) pode ser declarado como um alias para uma dessas tags, para indicar o concept de iterator mais forte que `It` pretende modelar. 

  1. `input_iterator_tag` corresponde a [`input_iterator`](<#/doc/iterator/input_iterator>). 
  2. `forward_iterator_tag` corresponde a [`forward_iterator`](<#/doc/iterator/forward_iterator>). 
  3. `bidirectional_iterator_tag` corresponde a [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>). 
  4. `random_access_iterator_tag` corresponde a [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). 
  5. `contiguous_iterator_tag` corresponde a [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>). 

Se `iterator_concept` não for fornecido, `iterator_category` é usado como um fallback. Se `iterator_category` também não for fornecido (ou seja, `It` não é um [LegacyIterator](<#/doc/named_req/Iterator>)), e [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt; não for especializado, `random_access_iterator_tag` é assumido. Em qualquer caso, cada concept não é satisfeito se as operações necessárias não forem suportadas, independentemente da tag.  | (desde C++20)  
  
### Notas

Não há uma tag separada para [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>). Ou seja, não é possível identificar um [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) com base em seu `iterator_category`. Para definir algoritmos especializados para iterators contíguos, use o concept [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).(desde C++20)

Não há correspondências entre `output_iterator_tag` e o concept [`output_iterator`](<#/doc/iterator/output_iterator>). Definir `iterator_concept` para `output_iterator_tag` apenas indica que o tipo não modela [`input_iterator`](<#/doc/iterator/input_iterator>). 

### Exemplo

Uma técnica comum para seleção de algoritmo baseada em tags de categoria de iterator é usar uma função dispatcher (a alternativa é [std::enable_if](<#/doc/types/enable_if>)). As classes de tag de iterator também são usadas nas definições de concepts correspondentes para denotar os requisitos, que não podem ser expressos apenas em termos de padrões de uso.(desde C++20)

Run this code
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    // Usando concepts (a verificação de tag faz parte dos próprios concepts)
    
    template<std::bidirectional_iterator BDIter>
    void alg(BDIter, BDIter)
    {
        std::cout << "1. alg() \t called for bidirectional iterator\n";
    }
    
    template<std::random_access_iterator RAIter>
    void alg(RAIter, RAIter)
    {
        std::cout << "2. alg() \t called for random-access iterator\n";
    }
    
    // Legado, usando dispatch de tag
    
    namespace legacy
    {
        // Muitas vezes, detalhes de implementação são ocultados em um namespace dedicado
        namespace implementation_details
        {
            template<class BDIter>
            void alg(BDIter, BDIter, std::bidirectional_iterator_tag)
            {
                std::cout << "3. legacy::alg() called for bidirectional iterator\n";
            }
    
            template<class RAIter>
            void alg(RAIter, RAIter, std::random_access_iterator_tag)
            {
                std::cout << "4. legacy::alg() called for random-access iterator\n";
            }
        } // namespace implementation_details
    
        template<class Iter>
        void alg(Iter first, Iter last)
        {
            implementation_details::alg(first, last,
                typename std::iterator_traits<Iter>::iterator_category());
        }
    } // namespace legacy
    
    int main()
    {
        std::list<int> l;
        alg(l.begin(), l.end()); // 1.
        legacy::alg(l.begin(), l.end()); // 3.
    
        std::vector<int> v;
        alg(v.begin(), v.end()); // 2.
        legacy::alg(v.begin(), v.end()); // 4.
    
    //  std::istreambuf_iterator<char> i1(std::cin), i2;
    //  alg(i1, i2);         // erro de compilação: nenhuma função correspondente para a chamada
    //  legacy::alg(i1, i2); // erro de compilação: nenhuma função correspondente para a chamada
    }
```

Output: 
```
    1. alg() 	 called for bidirectional iterator
    3. legacy::alg() called for bidirectional iterator
    2. alg() 	 called for random-access iterator
    4. legacy::alg() called for random-access iterator
```

### Veja também

[ iterator](<#/doc/iterator/iterator>)(obsoleto em C++17) | classe base para facilitar a definição de tipos necessários para iterators simples   
(template de classe)  
[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um iterator   
(template de classe)