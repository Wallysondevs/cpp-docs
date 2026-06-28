# std::chrono::year::year

```cpp
year() = default;  // (1) (desde C++20)
constexpr explicit year( int y ) noexcept;  // (2) (desde C++20)
```

Constrói um objeto `year`.

1) O construtor padrão deixa o valor do ano não inicializado.

2) Se y estiver no intervalo `[`-32767`, `32767`]`, constrói um objeto `year` contendo o valor do ano y. Caso contrário, o valor contido é não especificado.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono;
     
        constexpr int leap_years = []
        {
            int count{};
            for (int i{year::min()}; i <= int{year::max()}; ++i)
                if (year{i}.is_leap()) // uses constructor (2)
                    ++count;
            return count;
        } ();
     
        static_assert(15891 == leap_years);
     
        std::cout << "There are " << leap_years << " leap years in the range ["
                  << int(year::min()) << ", " << int(year::max()) << "].\n";
    }
```

Saída:
```
    There are 15891 leap years in the range [-32767, 32767].
```