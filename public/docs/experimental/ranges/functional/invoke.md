# std::experimental::ranges::invoke

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class F, class... Args >
std::result_of_t<F&&(Args&&...)> invoke( F&& f, Args&&... args );
```

Invoca o objeto [Callable](<#/doc/named_req/Callable>) `f` com os parâmetros `args`, e retorna o resultado, como se por `return INVOKE([std::forward](<#/doc/utility/forward>)<F>(f), [std::forward](<#/doc/utility/forward>)<Args>(args)...);`, onde _INVOKE(f, t1, t2, ..., tN)_ é definido da seguinte forma:

*   se `f` é um [ponteiro para função membro](<#/doc/language/pointer>) da classe `T`:

    *   Se [std::is_base_of](<#/doc/types/is_base_of>)<T, [std::decay_t](<#/doc/types/decay>)<decltype(t1)>>::value é verdadeiro, então INVOKE(f, t1, t2, ..., tN) é equivalente a (t1.*f)(t2, ..., tN),
    *   caso contrário, INVOKE(f, t1, t2, ..., tN) é equivalente a ((*t1).*f)(t2, ..., tN).

*   caso contrário, se `N == 1` e `f` é um [ponteiro para membro de dados](<#/doc/language/pointer>) da classe `T`:

    *   Se [std::is_base_of](<#/doc/types/is_base_of>)<T, [std::decay_t](<#/doc/types/decay>)<decltype(t1)>>::value é verdadeiro, então INVOKE(f, t1) é equivalente a t1.*f,
    *   caso contrário, então INVOKE(f, t1) é equivalente a (*t1).*f.

*   caso contrário, INVOKE(f, t1, t2, ..., tN) é equivalente a f(t1, t2, ..., tN) (isto é, `f` é um [FunctionObject](<#/doc/named_req/FunctionObject>)).

### Parâmetros

- **f** — objeto [Callable](<#/doc/named_req/Callable>) a ser invocado
- **args** — argumentos a serem passados para `f`

### Veja também

[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(modelo de função)