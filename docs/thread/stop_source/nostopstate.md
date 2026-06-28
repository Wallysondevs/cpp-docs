# std::nostopstate, std::nostopstate_t

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
struct nostopstate_t { explicit nostopstate_t() = default; };
inline constexpr std::nostopstate_t nostopstate {};
```

1) Tipo de tag vazio destinado ao uso como um placeholder no construtor não-padrão de [std::stop_source](<#/doc/thread/stop_source>), que torna o [std::stop_source](<#/doc/thread/stop_source>) construído vazio, sem estado de parada associado.

2) A instância de objeto constante correspondente de `std::nostopstate_t` para uso na construção de um [std::stop_source](<#/doc/thread/stop_source>) vazio, como um valor placeholder no construtor não-padrão.

### Veja também

[ stop_source](<#/doc/thread/stop_source>)(C++20) | classe que representa uma requisição para parar uma ou mais [std::jthread](<#/doc/thread/jthread>)s
(classe)