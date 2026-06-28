# Objeto de ponto de customização (desde C++20)

### Explicação
  
O nome `cpo` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___cpo_fn_`.

Todas as instâncias de `___cpo_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___cpo_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser `const`-qualificada ou não (no entanto, uma instância `volatile`-qualificada não é obrigada a ser invocável). Assim, `cpo` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `cpo` acima, `___cpo_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__cpo_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cpo_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__cpo_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cpo_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___cpo_fn_` participa da resolução de sobrecarga.

### Veja também

  * [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (RAO)
  * [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>) (RACO)
