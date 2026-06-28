# std::chrono::duration&lt;Rep,Period&gt;::max

```cpp
static constexpr duration max();  // (até C++20)
static constexpr duration max() noexcept;  // (desde C++20)
```

  
Retorna uma duration com o maior valor possível.

Se a representação `rep` da duration exigir alguma outra implementação para retornar uma duration de comprimento máximo, [std::chrono::duration_values](<#/doc/chrono/duration_values>) pode ser especializada para retornar o valor desejado.

### Parâmetros

(nenhum)

### Valor de retorno

duration([std::chrono::duration_values](<#/doc/chrono/duration_values>)&lt;rep&gt;::max())

### Exemplo

Run this code
```
    #include <chrono>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        constexpr uint64_t chrono_years_max = std::chrono::years::max().count();
        constexpr uint64_t chrono_seconds_max = std::chrono::seconds::max().count();
     
        constexpr uint64_t age_of_universe_in_years{13'787'000'000}; // Λ-CDM ≈ k₁/H₀ = k₂/42
        constexpr uint64_t seconds_per_year{365'25 * 24 * 36}; // 365¼ × 24 × 60 × 60
        constexpr uint64_t age_of_universe_in_seconds{age_of_universe_in_years *
                                                      seconds_per_year};
        std::cout
            << std::scientific << std::setprecision(2)
            << "The Age of the Universe is ≈ "
            << static_cast<double>(age_of_universe_in_years) << " years or "
            << static_cast<double>(age_of_universe_in_seconds) << " seconds.\n\n"
            << "chrono::years::max() = " << chrono_years_max
            << ", sizeof(chrono::years) = "
            << sizeof(std::chrono::years) << " bytes.\n" "chrono::years "
            << (age_of_universe_in_years <= chrono_years_max ? "CAN" : "CANNOT")
            << " keep the Age of the Universe in YEARS.\n\n"
            << "chrono::seconds::max() = " << chrono_seconds_max
            << ", sizeof(chrono::seconds) = "
            << sizeof(std::chrono::seconds) << " bytes.\n" "chrono::seconds "
            << (age_of_universe_in_seconds <= chrono_seconds_max ? "CAN" : "CANNOT")
            << " keep the Age of the Universe in SECONDS.\n";
    }
```

Saída possível:
```
    The Age of the Universe is ≈ 1.38e+10 years or 4.35e+17 seconds.
     
    chrono::years::max() = 2147483647, sizeof(chrono::years) = 4 bytes.
    chrono::years CANNOT keep the Age of the Universe in YEARS.
     
    chrono::seconds::max() = 9223372036854775807, sizeof(chrono::seconds) = 8 bytes.
    chrono::seconds CAN keep the Age of the Universe in SECONDS.
```

### Ver também

[ zero](<#/doc/chrono/duration/zero>)[static] |  retorna o valor de duration especial zero   
(função membro estática pública)  
[ min](<#/doc/chrono/duration/min>)[static] |  retorna o valor de duration especial min   
(função membro estática pública)