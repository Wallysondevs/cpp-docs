# std::experimental::ranges::input_iterator_tag, std::experimental::ranges::output_iterator_tag, std::experimental::ranges::forward_iterator_tag, std::experimental::ranges::bidirectional_iterator_tag, std::experimental::ranges::random_access_iterator_tag

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
struct input_iterator_tag {};
struct output_iterator_tag {};
struct forward_iterator_tag : public input_iterator_tag {};
struct bidirectional_iterator_tag : public forward_iterator_tag {};
struct random_access_iterator_tag : public bidirectional_iterator_tag {};
```

  
Define a categoria de um iterator. Cada tag é um tipo vazio e corresponde a uma das cinco categorias de iterator: 

  * `input_iterator_tag` corresponde a [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>). 
  * `forward_iterator_tag` corresponde a [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>). 
  * `bidirectional_iterator_tag` corresponde a [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>). 
  * `random_access_iterator_tag` corresponde a [`RandomAccessIterator`](<#/doc/experimental/ranges/iterator/RandomAccessIterator>). 
  * `output_iterator_tag` corresponde a [`OutputIterator`](<#/doc/experimental/ranges/iterator/OutputIterator>); não é usada e é fornecida apenas para compatibilidade retroativa. 

As tags de categoria de iterator carregam informações que podem ser usadas para selecionar os algoritmos mais eficientes para o conjunto de requisitos específico que é implícito pela categoria. No entanto, a sobrecarga baseada em concepts é preferida. 

Para cada tipo [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>) `I`, `ranges::iterator_category_t<I>` deve ser definido como um alias para a tag de categoria mais específica que descreve o comportamento do iterator. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag](<#/doc/iterator/iterator_tags>)(C++20) |  tipos de classe vazios usados para indicar categorias de iterator   
(class)  
[ iterator_traits](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/iterator/iterator_traits&action=edit&redlink=1> "cpp/experimental/ranges/iterator/iterator traits \(page does not exist\)") |  classe de traits de compatibilidade que coleta os tipos associados de um iterator  
(alias template)