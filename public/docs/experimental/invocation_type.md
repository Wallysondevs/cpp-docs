# std::experimental::invocation_type, std::experimental::raw_invocation_type

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```c
template< class >
struct raw_invocation_type; //indefinido
```

template< class Fn, class... ArgTypes >
struct raw_invocation_type<Fn(ArgTypes...)>; | (1) | (library fundamentals TS)
template< class >
struct invocation_type; //indefinido

template< class Fn, class... ArgTypes >
struct invocation_type<Fn(ArgTypes...)>; | (2) | (library fundamentals TS)

Calcula os _parâmetros de invocação_ quando `Fn` é chamado com os argumentos `ArgTypes...`, como em INVOKE([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...), onde INVOKE é a operação definida em [Callable](<#/doc/named_req/Callable>).

Os _parâmetros de invocação_ da expressão INVOKE(f, t1, t2, ..., tN) são definidos como segue, onde `T1` é o tipo (possivelmente cv-qualificado) de `t1` e `U1` é `T1&` se `t1` é um lvalue e `T1&&` caso contrário:

  * Se `f` é um ponteiro para uma função membro de uma classe `T`, então os parâmetros de invocação são `U1` seguido pelos parâmetros de `f` correspondidos por `t2, ..., tN`.
  * Se `N == 1` e `f` é um ponteiro para dados membro de uma classe `T`, então o parâmetro de invocação é `U1`.
  * Se `f` é um objeto de tipo de classe, os parâmetros de invocação são os parâmetros correspondentes a `t1, ..., tN` da melhor função viável para os argumentos `t1, ..., tN` entre os operadores de chamada de função e funções de chamada substitutas de `f`.
  * Em todos os outros casos, os parâmetros de invocação são os parâmetros de `f` correspondentes a `t1, ..., tN`.

Se um argumento `tI` corresponde a uma elipse na lista de parâmetros da função, o parâmetro de invocação correspondente é o resultado da aplicação das promoções de argumento padrão a `tI`.

`Fn` e todos os tipos em `ArgTypes` podem ser qualquer tipo completo, array de limite desconhecido, ou `void` (possivelmente cv-qualificado).

### Tipos de membro

Tipo de membro | Definição
---|---
raw_invocation_type<Fn(ArgTypes...)>::type | R(T1, T2, ...), onde:

  * `R` é [std::result_of_t](<#/doc/types/result_of>)<Fn(ArgTypes...)>.
  * `T1, T2, ...` são os _parâmetros de invocação_ de INVOKE([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) conforme definido acima.

Definido apenas se `Fn` puder ser chamado com os argumentos `ArgTypes...` em contexto não avaliado.
invocation_type<Fn(ArgTypes...)>::type | R(U1, U2, ...), onde

  * `R` é [std::result_of_t](<#/doc/types/result_of>)<Fn(ArgTypes...)>.
  * `T1, T2, ...` são os _parâmetros de invocação_ de INVOKE([std::declval](<#/doc/utility/declval>)&lt;Fn&gt;(), [std::declval](<#/doc/utility/declval>)&lt;ArgTypes&gt;()...) conforme definido acima.
  * `A1, A2, ...` denota `ArgTypes...`
  * `Ui` é [std::decay_t](<#/doc/types/decay>)&lt;Ai&gt; se [std::declval](<#/doc/utility/declval>)&lt;Ai&gt;() é um rvalue e `Ti` caso contrário.

Definido apenas se `Fn` puder ser chamado com os argumentos `ArgTypes...` em contexto não avaliado.

### Tipos auxiliares

template< class T >
using raw_invocation_type_t = typename raw_invocation_type&lt;T&gt;::type; | | (library fundamentals TS)
template< class T >
using invocation_type_t = typename invocation_type&lt;T&gt;::type; | | (library fundamentals TS)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[Documentação C++](<#/doc/experimental/reflect>) para Reflection TS
---