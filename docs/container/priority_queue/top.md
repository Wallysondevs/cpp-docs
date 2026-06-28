# std::priority_queue&lt;T,Container,Compare&gt;::top

const_reference top() const;

  
Retorna uma referência para o elemento superior na priority queue. Este elemento será removido em uma chamada para [pop()](<#/doc/container/priority_queue/pop>). Se a função de comparação padrão for usada, o elemento retornado também é o maior entre os elementos na queue. 

### Parâmetros

(nenhum) 

### Valor de retorno

Referência para o elemento superior como se obtido por uma chamada para c.front(). 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
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

[ pop](<#/doc/container/priority_queue/pop>) | remove o elemento superior   
(função membro pública)  