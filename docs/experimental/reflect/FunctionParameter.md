# std::experimental::reflect::FunctionParameter

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept FunctionParameter = Typed<T> && ScopeMember<T> && /* see below */;
```

O concept `FunctionParameter` é satisfeito se e somente se `T` reflete um parâmetro de função (Nota: Um `FunctionParameter` não satisfaz `Variable`, e portanto não oferece uma interface para obter o ponteiro para um parâmetro).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização