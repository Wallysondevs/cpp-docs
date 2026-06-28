# Requisitos nomeados C++: LegacyContiguousIterator (desde C++17)

Um **LegacyContiguousIterator** é um [LegacyIterator](<#/doc/named_req/Iterator>) cujos elementos logicamente adjacentes também são fisicamente adjacentes na memória.

Um ponteiro para um elemento de um array satisfaz todos os requisitos de LegacyContiguousIterator.

### Requisitos

O tipo It satisfaz LegacyContiguousIterator se

  * O tipo It satisfaz [LegacyIterator](<#/doc/named_req/Iterator>)

E, para cada

  * a, um iterator desreferenciável do tipo It
  * n, um valor integral

tal que

  * a + n é um valor de iterator válido e desreferenciável

então

  * *(a + n) is equivalent to *([std::addressof](<#/doc/memory/addressof>)(*a) + n).

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão são **LegacyContiguousIterator s**.

  * [`array::iterator`](<#/doc/container/array>).
  * [`basic_string_view::iterator`](<#/doc/string/basic_string_view>).
  * [`basic_string::iterator`](<#/doc/string/basic_string>).
  * [`vector::iterator`](<#/doc/container/vector>) para `value_type` diferente de bool.
  * O tipo de retorno de [`begin(valarray)`](<#/doc/numeric/valarray/begin2>) e [`end(valarray)`](<#/doc/numeric/valarray/end2>).

### Notas

[Fancy pointer](<#/doc/named_req/Allocator>) para tipos de objeto também são obrigados a satisfazer LegacyContiguousIterator.

LegacyContiguousIterator é substituído pelo concept [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>): tipos de iterator na biblioteca padrão que são obrigados a satisfazer LegacyContiguousIterator em C++17 são obrigados a modelar `contiguous_iterator` em C++20. | (desde C++20)

### Veja também

[ contiguous_iterator](<#/doc/iterator/contiguous_iterator>)(C++20) | especifica que um [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) é um iterator contíguo, referindo-se a elementos que são contíguos na memória
(concept)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, traits de iterator, adaptadores e funções de utilidade