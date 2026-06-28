# std::experimental::reseed

Definido no cabeçalho `[<experimental/random>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/random&action=edit&redlink=1> "cpp/header/experimental/random \(page does not exist\)")`

```c
void reseed();
void reseed( std::default_random_engine::result_type value );
```

Reinicializa o [motor de números aleatórios por thread](<#/doc/experimental/lib_extensions_2>) e quaisquer instâncias de [std::uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>) usadas por [`randint`](<#/doc/experimental/randint>).

1) Define o motor por thread para um estado imprevisível.

2) Semeia o motor por thread `g` como se por g.seed(value).

### Parâmetros

- **value** — valor da nova semente

### Observações

Chamadas subsequentes a `randint` não dependem de valores produzidos pelo motor por thread antes de chamar `reseed`.

### Exemplo

Execute este código
```cpp
    #include <experimental/random>
    #include <iostream>
    
    int main()
    {
        std::experimental::reseed();
    
        std::cout << "Random 2-digit decimal numbers: ";
    
        for (auto i = 0; i != 3; ++i)
            std::cout << std::experimental::randint(10, 99) << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    Random 2-digit decimal numbers: 41 60 56
```

### Veja também

[ randint](<#/doc/experimental/randint>) | gera um inteiro aleatório no intervalo especificado
(modelo de função)