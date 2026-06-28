# std::priority_queue&lt;T,Container,Compare&gt;::push

```cpp
void push( const value_type& value );  // (1)
void push( value_type&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido à fila de prioridade.

1) Equivalente a: c.push_back(value); [std::push_heap](<#/doc/algorithm/push_heap>)(c.begin(), c.end(), comp);.

2) Equivalente a: c.push_back(std::move(value)); [std::push_heap](<#/doc/algorithm/push_heap>)(c.begin(), c.end(), comp);.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
  
### Valor de retorno

(nenhum) 

### Complexidade

Número logarítmico de comparações mais a complexidade de Container::push_back. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <queue>
    
    struct Event
    {
        int priority{};
        char data{' '};
    
        friend bool operator<(Event const& lhs, Event const& rhs)
        {
            return lhs.priority < rhs.priority;
        }
    
        friend std::ostream& operator<<(std::ostream& os, Event const& e)
        {
            return os << '{' << e.priority << ", '" << e.data << "'}";
        }
    };
    
    int main()
    {
        std::priority_queue<Event> events;
    
        std::cout << "Fill the events queue:\t";
    
        for (auto const e : {Event{6,'L'}, {8,'I'}, {9,'S'}, {1,'T'}, {5,'E'}, {3,'N'}})
        {
            std::cout << e << ' ';
            events.push(e);
        }
    
        std::cout << "\nProcess events:\t\t";
    
        for (; !events.empty(); events.pop())
        {
            Event const& e = events.top();
            std::cout << e << ' ';
        }
    
        std::cout << '\n';
    }
```

Saída: 
```
    Fill the events queue:  {6, 'L'} {8, 'I'} {9, 'S'} {1, 'T'} {5, 'E'} {3, 'N'}
    Process events:         {9, 'S'} {8, 'I'} {6, 'L'} {5, 'E'} {3, 'N'} {1, 'T'}
```

### Veja também

[ emplace](<#/doc/container/priority_queue/emplace>)(C++11) |  constrói o elemento no local e ordena o container subjacente   
(função membro pública)  
[ pop](<#/doc/container/priority_queue/pop>) |  remove o elemento superior   
(função membro pública)