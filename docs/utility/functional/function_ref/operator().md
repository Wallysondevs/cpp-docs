# std::function_ref::operator()

```cpp
R operator()( Args... args ) const noexcept(/*noex*/);  // (desde C++26)
```

Invoca o `_[thunk-ptr](<#/doc/utility/functional/function_ref>)_` armazenado com `_[bound-entity](<#/doc/utility/functional/function_ref>)_` como seu primeiro parâmetro e o restante dos parâmetros `args`. A parte /*noex*/ de operator() é idêntica àquelas do parâmetro de template de `std::function_ref`.

Equivalente a return `_[thunk-ptr](<#/doc/utility/functional/function_ref>)_`(`_[bound-entity](<#/doc/utility/functional/function_ref>)_` , [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);.

### Parâmetros

- **args** — parâmetros restantes a serem passados para o `_[thunk-ptr](<#/doc/utility/functional/function_ref>)_` armazenado

### Valor de retorno

`_[thunk-ptr](<#/doc/utility/functional/function_ref>)_`(`_[bound-entity](<#/doc/utility/functional/function_ref>)_` , [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

### Exceções

Propaga a exceção lançada pela chamada de função subjacente.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::function<R(Args...)>`)
[ operator()](<#/>) | chama a função armazenada
(função membro pública de `std::reference_wrapper<T>`)