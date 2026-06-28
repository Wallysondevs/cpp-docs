# std::istream_iterator&lt;T,CharT,Traits,Distance&gt;::operator++, operator++(int)

```cpp
istream_iterator& operator++();  // (1)
istream_iterator operator++( int );  // (2)
```

  
Lê um valor do stream subjacente (usando seu [`operator>>`](<#/doc/io/basic_istream/operator_gtgt>)) e o armazena no objeto iterator. Se a leitura falhar (o [`fail()`](<#/doc/io/basic_ios/fail>) do stream subjacente retornar true), o iterator se torna o iterator de fim de stream.

O comportamento é indefinido se o iterator for um iterator de fim de stream.

### Parâmetros

(nenhum)

### Valor de retorno

1) *this

2) Um `istream_iterator` que contém um valor inalterado.

### Exceções

Pode lançar exceções definidas pela implementação.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 260](<https://cplusplus.github.io/LWG/issue260>) | C++98  | o tipo de retorno de operator++(int) era `istream_iterator&` | corrigido para `istream_iterator`  
[LWG 788](<https://cplusplus.github.io/LWG/issue788>) | C++98  | o `operator void*` do stream subjacente era  
usado para determinar se a leitura falhava, mas foi  
removido pela resolução do [LWG issue 468](<https://cplusplus.github.io/LWG/issue468>) | usa [`fail()`](<#/doc/io/basic_ios/fail>) em vez disso   
[LWG 838](<https://cplusplus.github.io/LWG/issue838>) | C++98  | não estava claro se iterators de fim de stream podem ser incrementados  | o comportamento é indefinido 