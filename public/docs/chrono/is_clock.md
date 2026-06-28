# std::chrono::is_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class T >
struct is_clock;
```

Se `T` satisfaz os requisitos de [Clock](<#/doc/named_req/Clock>), fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Para o propósito desta trait, a extensão em que uma implementação determina que um tipo não pode atender aos requisitos de [Clock](<#/doc/named_req/Clock>) é não especificada, exceto que, no mínimo, `T` não se qualificará como um [Clock](<#/doc/named_req/Clock>) a menos que atenda a todas as seguintes condições:

*   Cada um dos seguintes [identificadores qualificados](<#/doc/language/name>) é válido e denota um tipo:

    *   `T::rep`
    *   `T::period`
    *   `T::duration`
    *   `T::time_point`

*   Cada uma das seguintes expressões é bem-formada quando tratada como um [operando não avaliado](<#/doc/language/expressions>):

    *   `T::is_steady`
    *   `T::now()`

Se o programa adicionar especializações para `std::is_clock` ou `std::is_clock_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_clock_v = is_clock<T>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` satisfaz os requisitos de [Clock](<#/doc/named_req/Clock>), false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna o valor
(função membro pública)
operator()(C++14) | retorna o valor
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class>
    struct is_clock : std::false_type {};
    
    template<class T>
        requires
            requires
            {
                typename T::rep;
                typename T::period;
                typename T::duration;
                typename T::time_point;
                T::is_steady; // type is not checked
                T::now();     // return type is not checked
            }
    struct is_clock<T> : std::true_type {};
```

---

### Notas

Se `T` de outra forma atende aos requisitos de [Clock](<#/doc/named_req/Clock>), mas `T::is_steady` não é do tipo `const bool`, ou `T::now()` não é do tipo `T::time_point`, o resultado de `is_clock_v<T>` é não especificado.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <ratio>
    
    static_assert
    (
        std::chrono::is_clock_v<std::chrono::utc_clock> and
        not std::chrono::is_clock_v<std::chrono::duration<int, std::exa>>
    );
    
    int main() {}
```
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.