# Requisitos nomeados C++: SeedSequence (desde C++11)

Uma **SeedSequence** é um objeto que produz valores inteiros sem sinal i no intervalo 0 ≤ i < 232
com base em um range consumido de dados inteiros.

### Requisitos

*   `S` é um tipo SeedSequence.
*   `q` é um objeto de `S` e `r` é um objeto potencialmente constante de `S`.
*   `T` é o `result_type`.
*   `ib`, `ie` são [LegacyInputIterators](<#/doc/named_req/InputIterator>) com um `value_type` de valores inteiros sem sinal de pelo menos 32 bits.
*   `il` é um [std::initializer_list](<#/doc/utility/initializer_list>)&lt;T&gt;.
*   `rb`, `re` são [LegacyRandomAccessIterators](<#/doc/named_req/RandomAccessIterator>) [mutáveis](<#/doc/named_req/OutputIterator>) com um `value_type` de valores inteiros sem sinal de pelo menos 32 bits.
*   `ob` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

Expressão | Tipo | Notas | Complexidade
---|---|---|---
`S::result_type` | `T` | Inteiro sem sinal de pelo menos 32 bits. | Tempo de compilação
`S()` | | Cria uma seed sequence com o mesmo estado inicial que outras seed sequences de tipo `S` construídas por padrão. | Constante
`S(ib, ie)` | | Cria uma seed sequence com estado interno dependendo de alguns ou todos os bits de entrada fornecidos por `[`ib`, `ie`)`. | O(ie - ib)
`S(il)` | | O mesmo que `S(il.begin(), il.end())`. |
`q.generate(rb, re)` | `void` | Preenche `[`rb`, `re`)` com quantidades de 32 bits dependendo dos valores iniciais fornecidos e de potenciais chamadas anteriores a `generate`. Se `rb == re`, não faz nada. | O(re - rb)
`r.size()` | `size_t` | A quantidade de inteiros de 32 bits copiados por `param`. | Constante
`r.param(ob)` | `void` | Copia valores de 32 bits para `ob` que reproduziriam o estado atual do objeto se passados para um construtor de `S`. | O(r.size())

### Veja também

*   [std::seed_seq](<#/doc/numeric/random/seed_seq>)

*[_(como está)_]: A::pointer