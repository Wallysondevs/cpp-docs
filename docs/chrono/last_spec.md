# std::chrono::last_spec, std::chrono::last

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
struct last_spec
{
explicit last_spec() = default;
};  // (desde C++20)
inline constexpr last_spec last{};  // (desde C++20)
```

`last_spec` é um tipo de tag vazio que é usado em conjunto com outros tipos de calendário para indicar a última coisa em uma sequência. Dependendo do contexto, pode indicar o último dia de um mês (como em 2018y/February/last, para o último dia de fevereiro de 2018, ou seja, 2018-02-28) ou o último dia da semana em um mês (como em 2018/February/Sunday[last], para o último domingo de fevereiro de 2018, ou seja, 2018-02-25).

### Exemplo

Execute este código
```cpp
    #include <chrono>
     
    int main()
    {
        using namespace std::chrono;
     
        constexpr auto mdl {June/last};
        static_assert(mdl == month_day_last(month(6)));
     
        constexpr auto ymwdl {year(2023)/December/Tuesday[last]};
        static_assert(ymwdl ==
            year_month_weekday_last(year(2023), month(12), weekday_last(Tuesday)));
    }
```