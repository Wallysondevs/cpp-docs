# Requisitos Nomeados C++: LegacyOutputIterator

Um **LegacyOutputIterator** é um [LegacyIterator](<#/doc/named_req/Iterator>) que pode escrever no elemento apontado.

Um exemplo de um tipo que implementa LegacyOutputIterator é [std::ostream_iterator](<#/doc/iterator/ostream_iterator>).

Quando [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), ou [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) satisfaz os requisitos de LegacyOutputIterator além de seus próprios requisitos, ele é descrito como **mutável**.

### Requisitos

O tipo X satisfaz LegacyOutputIterator se

  * O tipo X satisfaz [LegacyIterator](<#/doc/named_req/Iterator>)
  * X é um tipo de classe ou um tipo de ponteiro

E, dado

  * o, um valor de algum tipo que é gravável no iterator de saída (pode haver múltiplos tipos que são graváveis, por exemplo, se operator= puder ser um template. Não há noção de `value_type` como para os iterators de entrada)
  * r, um lvalue do tipo X,

As seguintes expressões devem ser válidas e ter seus efeitos especificados

Expressão | Retorno | Expressão equivalente | Pré-condição | Pós-condições | Notas
---|---|---|---|---|---
*r = o | (não usado) | | r é desreferenciável | r é incrementável | Após esta operação, r não é obrigado a ser desreferenciável e quaisquer cópias do valor anterior de r não são mais obrigadas a ser desreferenciáveis ou incrementáveis.
++r | X& | | r é incrementável | r e ++r designam o mesmo objeto iterator, r é desreferenciável ou past-the-end | Após esta operação, r não é obrigado a ser incrementável e quaisquer cópias do valor anterior de r não são mais obrigadas a ser desreferenciáveis ou incrementáveis.
r++ | convertível para const X& | X temp = r;
++r;
return temp;
*r++ = o | (não usado) | *r = o;
++r;

### Notas

O único uso válido de operator* com um iterator de saída é à esquerda de uma atribuição: operator* pode retornar um objeto proxy, que define um membro operator= (que pode ser um template).

Igualdade e desigualdade podem não ser definidas para iterators de saída. Mesmo que um operator== seja definido, x == y não precisa implicar ++x == ++y.

A atribuição através do mesmo valor de um iterator de saída ocorre apenas uma vez: algoritmos em iterators de saída devem ser algoritmos de passagem única.

A atribuição através de um iterator de saída é esperada para alternar com o incremento. O incremento duplo é comportamento indefinido (o padrão C++ atualmente afirma que o incremento duplo é suportado, ao contrário da documentação da STL; este é o [LWG issue 2035](<https://cplusplus.github.io/LWG/issue2035>)).

Um iterator puramente de saída tem permissão para declarar seus iterator_traits&lt;X&gt;::value_type, iterator_traits&lt;X&gt;::difference_type, iterator_traits&lt;X&gt;::pointer, e iterator_traits&lt;X&gt;::reference como void (e iterators como [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) fazem exatamente isso, exceto por `difference_type`, que agora é definido para satisfazer [std::output_iterator](<#/doc/iterator/output_iterator>)(desde C++20)).

### Biblioteca padrão

Os seguintes iterators da biblioteca padrão são iterators de saída que não são iterators forward:

[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterator de saída que escreve em [std::basic_ostream](<#/doc/io/basic_ostream>)
(modelo de classe)
[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterator de saída que escreve em [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)
[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterator para inserção em um container
(modelo de classe)
[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterator para inserção no final de um container
(modelo de classe)
[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterator para inserção no início de um container
(modelo de classe)

### Veja também

[ output_iterator](<#/doc/iterator/output_iterator>)(C++20) | especifica que um tipo é um iterator de saída para um dado tipo de valor, ou seja, valores desse tipo podem ser escritos nele e ele pode ser pré- e pós-incrementado
(concept)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, traits de iterator, adaptadores e funções de utilidade