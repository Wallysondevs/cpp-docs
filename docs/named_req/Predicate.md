# Requisitos nomeados C++: Predicate

Os requisitos de **Predicate** descrevem um *callable* que retorna um valor [BooleanTestable](<#/doc/named_req/BooleanTestable>).

Um Predicate é tipicamente usado com algoritmos que recebem dados de entrada (objetos individuais/contêineres) e um *predicate*, que é então chamado nos dados de entrada para decidir o curso de ação subsequente. Alguns exemplos de uso de *predicate* na *standard library* C++ são:

  * [std::all_of](<#/doc/algorithm/all_any_none_of>), [std::any_of](<#/doc/algorithm/all_any_none_of>), [std::none_of](<#/doc/algorithm/all_any_none_of>) Recebem um *array* de elementos e um *predicate* como entrada. Chamam o *predicate* em elementos de entrada individuais e retornam `true` se para todos/qualquer/nenhum dos elementos, o *predicate* retorna `true`.

  * [std::find_if](<#/doc/algorithm/find>) Recebe uma sequência de elementos e um *predicate*. Retorna o primeiro elemento na sequência para o qual o *predicate* retorna um valor igual a `true`.

A descrição das facilidades de algoritmo, dada acima, é simplificada e tem como objetivo explicar Predicate em termos simples. Para informações detalhadas, consulte as páginas individuais.

Em outras palavras, se um algoritmo recebe um Predicate `pred` e um *iterator* `first`, ele deve ser capaz de testar o objeto do tipo apontado pelo *iterator* `first` usando o *predicate* fornecido através de uma construção como `if (pred(*first)) { /*...*/ }`.

O *function object* `pred` não deve aplicar nenhuma função não-constante através do *iterator* desreferenciado e deve aceitar um argumento `const`, com o mesmo comportamento independentemente de o argumento ser `const` ou não-`const`. Este *function object* pode ser um ponteiro para função ou um objeto de um tipo com um operador de chamada de função apropriado.

### Requisitos

  * [FunctionObject](<#/doc/named_req/FunctionObject>)

| Esta seção está incompleta
Razão: descrever melhor os requisitos reais

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3031](<https://cplusplus.github.io/LWG/issue3031>) | C++98 | requisitos sobre valores `const` eram insuficientes | requisitos fortalecidos

### Veja também

[ predicate](<#/doc/concepts/predicate>)(C++20) | especifica que um tipo *callable* é um *predicate* booleano (*concept*)
  *[_(as is)_]: A::pointer