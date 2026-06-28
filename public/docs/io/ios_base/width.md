# std::ios_base::width

```cpp
streamsize width() const;  // (1)
streamsize width( streamsize new_width );  // (2)
```

Gerencia o número mínimo de caracteres a serem gerados em certas operações de saída e o número máximo de caracteres a serem gerados em certas operações de entrada.

1) Retorna a largura de campo atual.

2) Define a largura de campo para o valor fornecido. Retorna a largura de campo anterior.

### Parâmetros

- **new_width** — nova configuração de largura de campo

### Valor de retorno

A largura de campo antes da chamada à função.

### Observações

Algumas funções de E/S chamam width(0) antes de retornar, veja [std::setw](<#/doc/io/manip/setw>) (isso faz com que este campo tenha efeito apenas na próxima função de E/S, e não em quaisquer E/S subsequentes).

Os efeitos exatos que este modificador tem na entrada e saída variam entre as funções de E/S individuais e são descritos em cada página de sobrecarga de `operator<<` e `operator>>` individualmente.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iomanip>
    #include <iostream>
    #include <span>
    #include <string_view>
    using namespace std::string_view_literals;
    
    constexpr std::array table_header =
    {
        "Language"sv, "Author"sv, "Birthdate"sv, "RIP date"sv
    };
    
    using row_t = std::array<std::string_view, table_header.size()>;
    using widths_t = std::array<std::size_t, table_header.size()>;
    
    constexpr std::array table_body = std::to_array<row_t>
    ({
        {"C", "Dennis Ritchie", "1941-09-09", "2011-10-12"},
        {"C++", "Bjarne Stroustrup", "1950-12-30"},
        {"C#", "Anders Hejlsberg", "1960-12-02"},
        {"Python", "Guido van Rossum", "1956-01-31"},
        {"Javascript", "Brendan Eich", "1961-07-04"}
    });
    
    constexpr widths_t calculate_column_widths(std::span<const row_t> table)
    {
        widths_t widths{};
        for (const row_t& row : table)
            for (size_t i = 0; i != row.size(); ++i)
                widths[i] = std::max(widths[i], row[i].size());
        return widths;
    }
    
    void print_row(const row_t& row, const widths_t& widths)
    {
        std::cout << '|';
        for (size_t i = 0; i != row.size(); ++i)
        {
            std::cout << ' ';
            std::cout.width(widths[i]);
            std::cout << row[i] << " |";
        }
        std::cout << '\n';
    };
    
    void print_break(const widths_t& widths)
    {
        const std::size_t margin = 1;
        std::cout.put('+').fill('-');
        for (std::size_t w : widths)
        {
            std::cout.width(w + margin * 2);
            std::cout << '-' << '+';
        }
        std::cout.put('\n').fill(' ');
    };
    
    int main()
    {
        constexpr widths_t widths = calculate_column_widths(table_body);
    
        std::cout.setf(std::ios::left, std::ios::adjustfield);
        print_break(widths);
        print_row(table_header, widths);
        print_break(widths);
        for (const row_t& row : table_body)
            print_row(row, widths);
        print_break(widths);
    }
```

Output:
```text
    +------------+-------------------+------------+------------+
    | Language   | Author            | Birthdate  | RIP date   |
    +------------+-------------------+------------+------------+
    | C          | Dennis Ritchie    | 1941-09-09 | 2011-10-12 |
    | C++        | Bjarne Stroustrup | 1950-12-30 |            |
    | C#         | Anders Hejlsberg  | 1960-12-02 |            |
    | Python     | Guido van Rossum  | 1956-01-31 |            |
    | Javascript | Brendan Eich      | 1961-07-04 |            |
    +------------+-------------------+------------+------------+
```

### Veja também

[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública)
[ setw](<#/doc/io/manip/setw>) | altera a largura do próximo campo de entrada/saída
(função)