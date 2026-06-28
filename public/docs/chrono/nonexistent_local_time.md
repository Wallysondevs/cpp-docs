# std::chrono::nonexistent_local_time

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class nonexistent_local_time;
```

Define um tipo de objeto a ser lançado como exceção para relatar que uma tentativa foi feita para converter um `std::chrono::local_time` inexistente para um `std::chrono::sys_time` sem especificar um `std::chrono::choose` (como `choose::earliest` ou `choose::latest`).

Esta exceção é lançada por `std::chrono::time_zone::to_sys` e funções que a chamam (como os construtores de `std::chrono::zoned_time` que recebem um `std::chrono::local_time`).

Diagrama de herança

### Funções membro

(construtor) | constrói o objeto de exceção
(função membro pública)
operator= | substitui o objeto de exceção
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::chrono::nonexistent_local_time::nonexistent_local_time

```cpp
template< class Duration >
nonexistent_local_time( const std::chrono::local_time<Duration>& tp,
const std::chrono::local_info& i );  // (1) (desde C++20)
nonexistent_local_time( const nonexistent_local_time& other ) noexcept;  // (2) (desde C++20)
```

Constrói o objeto de exceção.

1) A string explicativa retornada por `what()` é equivalente àquela produzida por `os.str()` após o seguinte código:
```cpp
    std::ostringstream os;
    os << tp << " is in a gap between\n"
       << std::chrono::local_seconds(i.first.end.time_since_epoch()) + i.first.offset
       << ' ' << i.first.abbrev << " and\n"
       << std::chrono::local_seconds(i.second.begin.time_since_epoch()) + i.second.offset
       << ' ' << i.second.abbrev
       << " which are both equivalent to\n"
       << i.first.end << " UTC";
```

O comportamento é indefinido se `i.result != std::chrono::local_info::nonexistent`.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::chrono::nonexistent_local_time`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **tp** — o ponto no tempo para o qual a conversão foi tentada
- **i** — um `std::chrono::local_info` descrevendo o resultado da tentativa de conversão
- **other** — outro `nonexistent_local_time` para copiar

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>)

### Notas

Como a cópia de uma classe da standard library derivada de `std::exception` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string separadamente alocada e com contagem de referências.

## std::chrono::nonexistent_locale_time::operator=

```cpp
nonexistent_locale_time& operator=( const nonexistent_locale_time& other ) noexcept;  // (desde C++20)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::chrono::nonexistent_locale_time`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::chrono::nonexistent_locale_time::what

```cpp
virtual const char* what() const noexcept;  // (desde C++20)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo, definida pela implementação, com informações explicativas. A string é adequada para conversão e exibição como um [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal comum durante a avaliação de constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Veja também

[ ambiguous_local_time](<#/doc/chrono/ambiguous_local_time>)(C++20) | exceção lançada para relatar que um tempo local é ambíguo
(classe)