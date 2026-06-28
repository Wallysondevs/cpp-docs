# std::stack&lt;T,Container&gt;::push

```cpp
void push( const value_type& value );  // (1)
void push( value_type&& value );  // (2) (desde C++11)
```

Adiciona o valor do elemento fornecido ao topo da stack.

1) Equivalente a: c.push_back(value).

2) Equivalente a: c.push_back(std::move(value)).

### Parâmetros

- **value** — o valor do elemento a ser adicionado

### Valor de retorno

(nenhum)

### Complexidade

Igual à complexidade de Container::push_back.

### Exemplo

Este programa implementa a [DSL](<https://en.wikipedia.org/wiki/Domain-specific_language> "enwiki:Domain-specific language") [BrainHack](<https://en.wikipedia.org/wiki/Brainfuck> "enwiki:Brainfuck"), onde o uso de [std::stack](<#/doc/container/stack>) é uma forma idiomática de processar colchetes emparelhados.

Execute este código
```cpp
    #include <array>
    #include <cstdint>
    #include <iostream>
    #include <map>
    #include <stack>
    #include <stdexcept>
    #include <string_view>
    
    class BrainHackInterpreter
    {
        std::map<unsigned, unsigned> open_brackets, close_brackets;
        std::array<std::uint8_t, 32768> data_{0};
        unsigned program_{0};
        int pos_{0};
    
        void collect_brackets(const std::string_view program)
        {
            std::stack<unsigned> brackets_stack;
    
            for (auto pos{0U}; pos != program.length(); ++pos)
            {
                if (const char c{program[pos]}; '[' == c)
                    brackets_stack.push(pos);
                else if (']' == c)
                {
                    if (brackets_stack.empty())
                        throw std::runtime_error("Brackets [] do not match!");
                    else
                    {
                        open_brackets[brackets_stack.top()] = pos;
                        close_brackets[pos] = brackets_stack.top();
                        brackets_stack.pop();
                    }
                }
            }
    
            if (!brackets_stack.empty())
                throw std::runtime_error("Brackets [] do not match!");
        }
    
        void check_data_pos(int pos)
        {
            if (pos < 0 or static_cast<int>(data_.size()) <= pos)
                throw std::out_of_range{"Data pointer out of bound!"};
        }
    
    public:
        BrainHackInterpreter(const std::string_view program)
        {
            for (collect_brackets(program); program_ < program.length(); ++program_)
                switch (program[program_])
                {
                    case '<':
                        check_data_pos(--pos_);
                        break;
                    case '>':
                        check_data_pos(++pos_);
                        break;
                    case '-':
                        --data_[pos_];
                        break;
                    case '+':
                        ++data_[pos_];
                        break;
                    case '.':
                        std::cout << data_[pos_];
                        break;
                    case ',':
                        std::cin >> data_[pos_];
                        break;
                    case '[':
                        if (data_[pos_] == 0)
                            program_ = open_brackets[program_];
                        break;
                    case ']':
                        if (data_[pos_] != 0)
                            program_ = close_brackets[program_];
                        break;
                }
        }
    };
    
    int main()
    {
        BrainHackInterpreter
        {
            "++++++++[>++>>++>++++>++++<<<<<-]>[<+++>>+++<-]>[<+"
            "+>>>+<<-]<[>+>+<<-]>>>--------.<<+++++++++.<<----.>"
            ">>>>.<<<------.>..++.<++.+.-.>.<.>----.<--.++.>>>+."
        };
        std::cout << '\n';
    }
```

Saída:
```
    Hi, cppreference!
```

### Veja também

[ emplace](<#/doc/container/stack/emplace>)(C++11) | constrói o elemento no local no topo
(função membro pública)
[ pop](<#/doc/container/stack/pop>) | remove o elemento do topo
(função membro pública)