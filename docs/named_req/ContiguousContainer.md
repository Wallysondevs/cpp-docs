# Requisitos nomeados C++: ContiguousContainer (desde C++17)

Um **ContiguousContainer** é um [Container](<#/doc/named_req/Container>) que armazena objetos em locais de memória contíguos.

### Requisitos

O tipo `X` satisfaz ContiguousContainer se

  * O tipo `X` satisfaz [Container](<#/doc/named_req/Container>)
  * O tipo `X` suporta [LegacyRandomAccessIterators](<#/doc/named_req/RandomAccessIterator>)
  * Os tipos membro X::iterator e X::const_iterator são [LegacyContiguousIterators](<#/doc/named_req/ContiguousIterator>)(ate C++20)[`contiguous_iterator`s](<#/doc/iterator/contiguous_iterator>)(desde C++20)

### Biblioteca padrão

Os seguintes tipos de string e containers da biblioteca padrão satisfazem os requisitos de ContiguousContainer:

[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(class template)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(class template)
[ array](<#/doc/container/array>)(C++11) | array contíguo embutido de tamanho fixo
(class template)
[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo embutido, de capacidade fixa e redimensionável dinamicamente
(class template)
  *[_(as is)_]: A::pointer