# std::ranges::iter_move

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ iter_move = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr decltype(auto) iter_move( T&& t ) noexcept(/* see below */);
```

Obtém uma referência rvalue ou um temporário prvalue de um dado iterator.

Um ranges::iter_move(t) é [equivalente em expressão](<#/doc/language/expressions>) a:

  1. iter_move(t), se t tiver um tipo de classe ou enumeração e a expressão for bem-formada quando tratada como um [operando não avaliado](<#/doc/language/expressions>), onde a [resolução de sobrecarga](<#/doc/language/overload_resolution>) de `iter_move` é realizada apenas com os candidatos encontrados pela [busca dependente de argumento](<#/doc/language/adl>).
  2. Caso contrário, std::move(*t) se *t for bem-formado e for um lvalue.
  3. Caso contrário, *t se *t for bem-formado e for um rvalue.

Em todos os outros casos, uma chamada para `ranges::iter_move` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando ranges::iter_move(e) aparece no contexto imediato de uma instanciação de template.

Se ranges::iter_move(e) não for igual a *e, o programa é malformado, nenhum diagnóstico exigido.

### Objetos de ponto de customização

O nome `ranges::iter_move` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___iter_move_fn_`.

Todas as instâncias de `___iter_move_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___iter_move_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é exigida para ser invocável). Assim, `ranges::iter_move` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::iter_move` acima, `___iter_move_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__iter_move_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __iter_move_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__iter_move_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __iter_move_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___iter_move_fn_` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ iter_move](<#/doc/iterator/reverse_iterator/iter_move>)(C++20) | converte o resultado da desreferenciação do iterator subjacente ajustado para seu tipo de referência rvalue associado
(função)
[ iter_move](<#/doc/iterator/move_iterator/iter_move>)(C++20) | converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado
(função)