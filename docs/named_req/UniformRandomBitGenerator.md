# Requisitos nomeados C++: UniformRandomBitGenerator (desde C++11)

Um gerador de bits aleatórios uniformes é um objeto de função que retorna valores inteiros sem sinal, de modo que cada valor no intervalo de resultados possíveis tenha (idealmente) probabilidade igual.

Geradores de bits aleatórios uniformes não são destinados a serem usados como geradores de números aleatórios: eles são usados como a fonte de bits aleatórios (gerados em massa, para eficiência). Qualquer gerador de bits aleatórios uniformes pode ser conectado a qualquer [distribuição de números aleatórios](<#/doc/numeric/random>) a fim de obter um número aleatório (formalmente, uma variável aleatória).

### Requisitos

O tipo `G` satisfaz UniformRandomBitGenerator se

Dado g, um valor do tipo `G`, todas as seguintes condições são satisfeitas:

  * `G::result_type` é válido e denota um tipo inteiro sem sinal.
  * As seguintes expressões devem ser válidas e ter seus efeitos especificados:

| (até C++20)
---|---|---
Expressão | Tipo | Requisitos
G::min() | `G::result_type` |

  * Produz o menor valor que o operator() de `G` pode retornar.
  * O valor resultante é estritamente menor que G::max().
  * A expressão deve ser uma expressão constante.

G::max() | `G::result_type` |

  * Produz o maior valor que o operator() de `G` pode retornar.
  * O valor resultante é estritamente maior que `G::min()`.
  * A expressão deve ser uma expressão constante.

g() | `G::result_type` |

  * Retorna um valor no intervalo fechado `[`G::min()`, `G::max()`]`.
  * Possui complexidade constante amortizada.

Todas as seguintes condições são satisfeitas:

  * `G` modela [`uniform_random_bit_generator`](<#/doc/numeric/random/UniformRandomBitGenerator>).
  * [std::invoke_result_t](<#/doc/types/result_of>)<G&> é um tipo inteiro sem sinal.
  * `G` fornece um nome de typedef aninhado `result_type`, que denota o mesmo tipo que [std::invoke_result_t](<#/doc/types/result_of>)<G&>.

| (desde C++20)

### Observações

Todos os [RandomNumberEngines](<#/doc/named_req/RandomNumberEngine>) satisfazem este requisito.

### Biblioteca padrão

As seguintes facilidades da biblioteca padrão esperam um tipo UniformRandomBitGenerator.

[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(até C++17)(C++11) | reordena aleatoriamente elementos em um range
(modelo de função)
[ sample](<#/doc/algorithm/sample>)(C++17) | seleciona N elementos aleatórios de uma sequência
(modelo de função)
[ generate_canonical](<#/doc/numeric/random/generate_canonical>)(C++11) | distribui uniformemente valores reais de uma dada precisão no intervalo `[`​0​`, `1`)`
(modelo de função)
[ uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)(C++11) | produz valores inteiros distribuídos uniformemente em um range
(modelo de classe)
[ uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)(C++11) | produz valores reais distribuídos uniformemente em um range
(modelo de classe)
todas as outras distribuições de números aleatórios

As seguintes facilidades da biblioteca padrão satisfazem UniformRandomBitGenerator sem satisfazer adicionalmente [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>):

[ random_device](<#/doc/numeric/random/random_device>)(C++11) | gerador de números aleatórios não determinístico usando fonte de entropia de hardware
(classe)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2154](<https://cplusplus.github.io/LWG/issue2154>)
([P0898R3](<https://wg21.link/P0898R3>)) | C++11 | não estava claro se G::min() e G::max()
são exigidos como expressões constantes[1](<#/doc/named_req/UniformRandomBitGenerator>) | exigido

  1. [↑](<#/doc/named_req/UniformRandomBitGenerator>) O requisito de complexidade de tempo para essas expressões era "tempo de compilação" antes do C++20. A redação é ambígua, pois "complexidade de tempo em tempo de compilação" pode ser interpretada tanto como "pode ser avaliada em tempo de compilação" quanto como "a complexidade de tempo pode ser determinada em tempo de compilação".

### Veja também

[ uniform_random_bit_generator](<#/doc/numeric/random/UniformRandomBitGenerator>)(C++20) | especifica que um tipo se qualifica como um gerador de bits aleatórios uniformes
(concept)
*[_(como está)_]: A::pointer