# std::nontype, std::nontype_t

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< auto V >
struct nontype_t { explicit nontype_t() = default; };
template< auto V >
constexpr std::nontype_t<V> nontype {};
```

1) O template de classe `std::nontype_t` pode ser usado na lista de parâmetros do construtor para corresponder à tag pretendida.

2) A instância `std::nontype` correspondente de (1) é uma tag de argumento de desambiguação que pode ser passada para os construtores de [std::function_ref](<#/doc/utility/functional/function_ref>) para indicar que o objeto contido deve ser construído com o valor do parâmetro de template não-tipo `V`.

### Parâmetros de template

- **V** — parâmetro de template não-tipo de um [tipo estrutural](<#/doc/language/template_parameters>).

### Veja também

[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | wrapper não-proprietário de qualquer objeto chamável
(template de classe)