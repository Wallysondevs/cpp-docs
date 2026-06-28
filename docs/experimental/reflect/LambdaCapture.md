# std::experimental::reflect::LambdaCapture

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept LambdaCapture = Variable<T> && /* see below */;
```

O concept `LambdaCapture` é satisfeito se e somente se T reflete uma captura de lambda conforme introduzido pela lista de captura ou por padrões de captura. (Nota: O `Scope` de um `LambdaCapture` é sua `Lambda` imediatamente envolvente).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização