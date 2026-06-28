# std::copyable_function::operator()

```cpp
R operator()( Args... args ) /*cv*/ /*ref*/ noexcept(/*noex*/);  // (desde C++26)
```

Invoca o alvo invocável armazenado com os parâmetros `args`. As partes /*cv*/, /*ref*/ e /*noex*/ de operator() são idênticas às do parâmetro de template de `std::copyable_function`.

Equivalente a return [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(/*cv-ref-cast*/(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);, onde `f` é um lvalue não qualificado por cv que denota o objeto alvo de *this, e /*cv-ref-cast*/(f) é equivalente a:

  * f se cv ref for vazio ou &, ou
  * [std::as_const](<#/doc/utility/as_const>)(f) se cv ref for const ou const &, ou
  * std::move(f) se cv ref for &&, ou
  * std::move([std::as_const](<#/doc/utility/as_const>)(f)) se cv ref for const &&.

O comportamento é indefinido se *this estiver vazio.

### Parâmetros

- **args** — parâmetros a serem passados para o alvo invocável armazenado

### Valor de retorno

[std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(/*cv-ref-cast*/(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

### Exceções

Propaga a exceção lançada pela chamada de função subjacente.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::function<R(Args...)>`)
[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::move_only_function`)
[ operator()](<#/>) | chama a função armazenada
(função membro pública de `std::reference_wrapper<T>`)
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(modelo de função)