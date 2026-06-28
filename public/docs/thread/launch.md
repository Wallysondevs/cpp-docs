# std::launch

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
enum class launch : /* unspecified */ {
async = /* unspecified */,
deferred = /* unspecified */,
/* implementation-defined */
};
```

`std::launch` é um [BitmaskType](<#/doc/named_req/BitmaskType>). Ele especifica a política de lançamento para uma tarefa executada pela função [std::async](<#/doc/thread/async>).

### Constantes

As seguintes constantes denotando bits individuais são definidas pela biblioteca padrão:

Nome | Explicação
---|---
`async` | a tarefa é executada em uma thread diferente, potencialmente criando-a e lançando-a primeiro
`deferred` | a tarefa é executada na thread chamadora na primeira vez que seu resultado é solicitado (avaliação preguiçosa)

Além disso, as implementações podem:

  * definir bits e bitmasks adicionais para especificar restrições nas interações de tarefas aplicáveis a um subconjunto de políticas de lançamento, e
  * habilitar essas bitmasks adicionais para a primeira sobrecarga (padrão) de [std::async](<#/doc/thread/async>).

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2102](<https://cplusplus.github.io/LWG/issue2102>) | C++11 | `std::launch` era um tipo definido pela implementação | não é definido pela implementação

### Veja também

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(function template)