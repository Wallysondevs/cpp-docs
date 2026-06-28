# Requisitos nomeados C++: RandomNumberEngineAdaptor (desde C++11)

Um **RandomNumberEngineAdaptor** é um [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>) que transforma a saída de outro [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>), sendo este último denominado um _motor base_.

### Requisitos

Dado

  * B, um [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>)
  * b, um objeto do tipo B
  * A, um **RandomNumberEngineAdaptor**, adaptando B como um motor base
  * a, um objeto do tipo A

função | semântica
---|---
A::A(); | O motor base é inicializado como se fosse pelo seu construtor padrão.
bool operator==(const A& lhs, const A& rhs); | Retorna se o motor base de lhs é igual ao motor base de rhs ou não.
A::A(result_type s); | O motor base é inicializado com s.
template&lt;class Sseq&gt; A::A(Sseq& q); | O motor base é inicializado com q.
void seed(); | Invoca b.seed().
void seed(result_type s); | Invoca b.seed(s).
template&lt;class Sseq&gt; void seed(Sseq& q); | Invoca b.seed(q).

Além disso

  * A complexidade de cada função de A não excede a complexidade da função de B
  * O estado de A inclui o estado de B
  * O tamanho do estado de A não é menor que o tamanho de b
  * Copiar o estado de A inclui copiar o estado de B
  * A representação textual de A inclui a representação textual de B

### Biblioteca padrão

As seguintes facilidades da biblioteca padrão satisfazem **RandomNumberEngineAdaptor**:

[ discard_block_engine](<#/doc/numeric/random/discard_block_engine>)(C++11) | descarta parte da saída de um motor de números aleatórios
(class template)
[ independent_bits_engine](<#/doc/numeric/random/independent_bits_engine>)(C++11) | empacota a saída de um motor de números aleatórios em blocos de um número especificado de bits
(class template)
[ shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)(C++11) | entrega a saída de um motor de números aleatórios em uma ordem diferente
(class template)
  *[_(as is)_]: A::pointer